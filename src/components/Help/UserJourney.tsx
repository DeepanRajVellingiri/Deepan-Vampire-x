import { 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw,
  FileText,
  Users,
  Shield
} from 'lucide-react';

interface JourneyStepProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

function JourneyStep({ number, title, children }: JourneyStepProps) {
  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-0 rounded-full bg-blue-600 text-white w-6 h-6 flex items-center justify-center text-sm font-medium">
        {number}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}

interface ExampleScenarioProps {
  title: string;
  children: React.ReactNode;
}

function ExampleScenario({ title, children }: ExampleScenarioProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h4 className="text-md font-medium text-gray-900 mb-3">{title}</h4>
      {children}
    </div>
  );
}

export function UserJourney() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              User Journey Examples
            </h1>
            <p className="text-blue-100">
              Step-by-step guides with real-world scenarios
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            Common Scenarios
          </h2>

          {/* Scenario 1: Basic Request */}
          <ExampleScenario title="Scenario 1: Basic Permission Request">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Initial Request:</p>
                  <ul className="list-disc pl-5 text-gray-600 mt-1">
                    <li>User requests <code className="bg-gray-100 px-1 rounded">User.Read</code> permission</li>
                    <li>Selects "Delegated" permission type</li>
                    <li>Justification: "Need to access user profile for personalization"</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>Business Approver Review</span>
                <ArrowRight className="h-4 w-4" />
                <span>Technical Approver Review</span>
                <ArrowRight className="h-4 w-4" />
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Approved</span>
              </div>
            </div>
          </ExampleScenario>

          {/* Scenario 2: Complex Request */}
          <ExampleScenario title="Scenario 2: Request with Additional Requirements">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Complex Request:</p>
                  <ul className="list-disc pl-5 text-gray-600 mt-1">
                    <li>User requests <code className="bg-gray-100 px-1 rounded">Mail.ReadWrite</code> permission</li>
                    <li>Requires GLR and API Scan documentation</li>
                    <li>Multiple approvers in sequence</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Required Documentation:</strong>
                </p>
                <ul className="list-disc pl-5 text-sm text-blue-700 mt-1">
                  <li>GLR Document (PDF)</li>
                  <li>API Scan Results</li>
                  <li>List of affected sites</li>
                </ul>
              </div>
              <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                <span>Submit with Docs</span>
                <ArrowRight className="h-4 w-4" />
                <span>Business Review</span>
                <ArrowRight className="h-4 w-4" />
                <span>Technical Review</span>
                <ArrowRight className="h-4 w-4" />
                <span>AM Team Review</span>
                <ArrowRight className="h-4 w-4" />
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Implemented</span>
              </div>
            </div>
          </ExampleScenario>

          {/* Scenario 3: Denial and Revision */}
          <ExampleScenario title="Scenario 3: Handling Denials and Revisions">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Initial Request:</p>
                  <ul className="list-disc pl-5 text-gray-600 mt-1">
                    <li>User requests multiple permissions including <code className="bg-gray-100 px-1 rounded">Directory.ReadWrite.All</code></li>
                    <li>Technical Approver denies due to insufficient justification</li>
                    <li>User revises and resubmits with additional details</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 flex-wrap gap-2">
                <span>Initial Submit</span>
                <ArrowRight className="h-4 w-4" />
                <span>Business Approved</span>
                <ArrowRight className="h-4 w-4" />
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Technical Denied</span>
                <RefreshCcw className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600">Revised</span>
                <ArrowRight className="h-4 w-4" />
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Approved</span>
              </div>
            </div>
          </ExampleScenario>
        </div>

        {/* Step by Step Guide */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            Detailed Steps
          </h2>

          <div className="border-l-2 border-blue-200">
            <JourneyStep number={1} title="Initial Request">
              <div className="text-gray-600 space-y-2">
                <p>Navigate to the permission request page and:</p>
                <ul className="list-disc pl-5">
                  <li>Click "Select permissions" dropdown</li>
                  <li>Choose required permissions</li>
                  <li>Select appropriate permission types (Application/Delegated)</li>
                  <li>Provide detailed justification for each permission</li>
                </ul>
              </div>
            </JourneyStep>

            <JourneyStep number={2} title="Additional Requirements">
              <div className="text-gray-600 space-y-2">
                <p>For permissions requiring extra documentation:</p>
                <ul className="list-disc pl-5">
                  <li>Upload required GLR documents</li>
                  <li>Attach API scan results</li>
                  <li>Provide links to relevant resources</li>
                  <li>List affected sites if applicable</li>
                </ul>
              </div>
            </JourneyStep>

            <JourneyStep number={3} title="Track Progress">
              <div className="text-gray-600 space-y-2">
                <p>Monitor your request in the dashboard:</p>
                <ul className="list-disc pl-5">
                  <li>View current approval stage</li>
                  <li>Check individual permission statuses</li>
                  <li>Read approver comments</li>
                  <li>Track implementation status</li>
                </ul>
              </div>
            </JourneyStep>

            <JourneyStep number={4} title="Handle Denials">
              <div className="text-gray-600 space-y-2">
                <p>If a permission is denied:</p>
                <ul className="list-disc pl-5">
                  <li>Review denial reasons in the dashboard</li>
                  <li>Click "Revise Permission" on the denied permission</li>
                  <li>Update justification or documentation</li>
                  <li>Resubmit for approval</li>
                </ul>
                <div className="bg-blue-50 p-3 rounded mt-3">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Approved permissions remain locked while you revise denied ones
                  </p>
                </div>
              </div>
            </JourneyStep>

            <JourneyStep number={5} title="Implementation">
              <div className="text-gray-600 space-y-2">
                <p>After full approval:</p>
                <ul className="list-disc pl-5">
                  <li>Permissions are marked as "Approved"</li>
                  <li>AM Team implements the permissions</li>
                  <li>Status changes to "Implemented"</li>
                  <li>You can start using the permissions in your application</li>
                </ul>
              </div>
            </JourneyStep>
          </div>
        </div>
      </div>
    </div>
  );
}