import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { Request } from '../components/Dashboard/types';
import { approvalStatusCache } from '../utils/ApprovalStatusCache';

interface RequestState {
  requests: Request[];
}

type RequestAction = 
  | { type: 'ADD_REQUEST'; payload: Request }
  | { type: 'UPDATE_REQUEST'; payload: { id: string; updates: Partial<Request> } };

const RequestContext = createContext<{
  state: RequestState;
  dispatch: React.Dispatch<RequestAction>;
} | null>(null);

function requestReducer(state: RequestState, action: RequestAction): RequestState {
  let newState: RequestState;

  switch (action.type) {
    case 'ADD_REQUEST':
      newState = {
        ...state,
        requests: [action.payload, ...state.requests]
      };
      // Update cache with new request
      approvalStatusCache.updateStatus(action.payload);
      return newState;

    case 'UPDATE_REQUEST':
      newState = {
        ...state,
        requests: state.requests.map(request =>
          request.id === action.payload.id
            ? { ...request, ...action.payload.updates }
            : request
        )
      };
      // Update cache with modified request
      const updatedRequest = newState.requests.find(r => r.id === action.payload.id);
      if (updatedRequest) {
        approvalStatusCache.updateStatus(updatedRequest);
      }
      return newState;

    default:
      return state;
  }
}

export function RequestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(requestReducer, { requests: [] });

  // Initialize cache with all requests on mount
  useEffect(() => {
    state.requests.forEach(request => {
      approvalStatusCache.updateStatus(request);
    });
  }, []);

  return (
    <RequestContext.Provider value={{ state, dispatch }}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
}