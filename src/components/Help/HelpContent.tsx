import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Shield, 
  Cog,
  AlertTriangle,
  Info,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SearchHelp } from './SearchHelp';
import { Breadcrumbs } from './Breadcrumbs';
import { ErrorBoundary } from './ErrorBoundary';
import { FAQ } from './FAQ';

interface HelpSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function HelpSection({ title, icon, children }: HelpSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function HelpContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Info className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Graph Permissions Help Center
            </h1>
            <p className="text-blue-100">
              Comprehensive guide to understanding and using the Graph Permissions system
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Quick Start</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Get started quickly with our step-by-step guide and examples.
          </p>
          <Link
            to="/help/journey"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View user journey
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">User Guide</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Learn how to request permissions and track their status.
          </p>
          <a href="#user-guide" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            Read guide
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <Cog className="h-6 w-6 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Admin Guide</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Manage requests and handle approvals efficiently.
          </p>
          <a href="#admin-guide" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            View admin guide
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {/* Overview Section */}
        <HelpSection title="System Overview" icon={<Shield className="h-6 w-6 text-blue-600" />}>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              The Graph Permissions system is a comprehensive platform for managing and requesting Microsoft Graph API permissions. It provides a structured workflow for permission requests, approvals, and implementation tracking.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 text-blue-700">
                <li>Streamlined permission request process</li>
                <li>Multi-stage approval workflow</li>
                <li>Real-time status tracking</li>
                <li>Revision management for denied permissions</li>
                <li>Comprehensive audit trail</li>
                <li>Additional requirements handling (GLR, API Scan, ASA)</li>
              </ul>
            </div>
          </div>
        </HelpSection>

        {/* User Guide Section */}
        <HelpSection title="User Guide" icon={<Users className="h-6 w-6 text-green-600" />}>
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Requesting Permissions</h3>
              <div className="text-gray-600 space-y-2">
                <p>a. <strong>Select Permissions:</strong></p>
                <ul className="list-disc pl-5 mb-2">
                  <li>Use the permission selector to choose required permissions</li>
                  <li>View detailed descriptions and requirements for each permission</li>
                  <li>Select Application and/or Delegated permission types</li>
                </ul>
                
                <p>b. <strong>Provide Justification:</strong></p>
                <ul className="list-disc pl-5 mb-2">
                  <li>Enter detailed justification for each permission</li>
                  <li>Explain the business need and use case</li>
                </ul>

                <p>c. <strong>Additional Requirements:</strong></p>
                <ul className="list-disc pl-5">
                  <li>Submit required documentation (GLR, API Scan, ASA)</li>
                  <li>Provide necessary attachments and links</li>
                  <li>List affected sites if applicable</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Tracking Requests</h3>
              <div className="text-gray-600">
                <p className="mb-2">Access the Dashboard to:</p>
                <ul className="list-disc pl-5">
                  <li>View all your permission requests</li>
                  <li>Track approval status and stages</li>
                  <li>Monitor individual permission statuses</li>
                  <li>Access approval history and comments</li>
                  <li>Download request data in CSV format</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Handling Denials</h3>
              <div className="text-gray-600">
                <p className="mb-2">If permissions are denied:</p>
                <ul className="list-disc pl-5">
                  <li>Review denial reasons and comments</li>
                  <li>Modify and resubmit denied permissions</li>
                  <li>Provide additional justification or documentation</li>
                  <li>Track revision history</li>
                </ul>
              </div>
            </div>
          </div>
        </HelpSection>

        {/* Admin Guide Section */}
        <HelpSection title="Administrator Guide" icon={<Cog className="h-6 w-6 text-purple-600" />}>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Request Management</h3>
              <div className="text-gray-600">
                <p className="mb-2">Key administrative functions:</p>
                <ul className="list-disc pl-5">
                  <li>View and filter all permission requests</li>
                  <li>Access detailed request information</li>
                  <li>Review permission justifications</li>
                  <li>Check additional requirements compliance</li>
                  <li>Track approval workflows</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Approval Process</h3>
              <div className="text-gray-600">
                <p className="mb-2">Approval workflow stages:</p>
                <ul className="list-disc pl-5">
                  <li><strong>Business Approver (Dukenrey):</strong> Initial business case review</li>
                  <li><strong>Technical Approver (Deepanraj):</strong> Technical assessment</li>
                  <li><strong>AM Team:</strong> Final approval and implementation</li>
                </ul>
                
                <div className="mt-4">
                  <p className="font-medium mb-2">Actions available:</p>
                  <ul className="list-disc pl-5">
                    <li>Approve permissions</li>
                    <li>Deny with comments</li>
                    <li>Request additional information</li>
                    <li>Track approval history</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Implementation Management</h3>
              <div className="text-gray-600">
                <p className="mb-2">Post-approval processes:</p>
                <ul className="list-disc pl-5">
                  <li>Mark permissions as implemented</li>
                  <li>Track implementation status</li>
                  <li>Maintain audit trail</li>
                  <li>Generate reports</li>
                </ul>
              </div>
            </div>
          </div>
        </HelpSection>

        {/* Status Explanations */}
        <HelpSection title="Understanding Statuses" icon={<FileText className="h-6 w-6 text-orange-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Pending</h4>
              </div>
              <p className="text-yellow-800">
                Request is currently in the approval process. Awaiting review from one or more approvers.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">Approved</h4>
              </div>
              <p className="text-green-800">
                Permission has been approved by all required approvers but not yet implemented.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                <h4 className="font-medium text-red-900">Denied</h4>
              </div>
              <p className="text-red-800">
                Permission has been denied by at least one approver. Can be revised and resubmitted.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Cog className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Implemented</h4>
              </div>
              <p className="text-blue-800">
                Approved permission has been successfully implemented in the system.
              </p>
            </div>
          </div>
        </HelpSection>

        {/* Important Notes */}
        <HelpSection title="Important Notes" icon={<AlertTriangle className="h-6 w-6 text-amber-600" />}>
          <div className="bg-amber-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-900">Permission Locking</h4>
                  <p className="text-amber-800">
                    Approved and implemented permissions are locked and cannot be modified. Only denied permissions can be revised.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-900">Revision Handling</h4>
                  <p className="text-amber-800">
                    When revising a request:
                  </p>
                  <ul className="list-disc pl-5 text-amber-800 mt-2">
                    <li>Approved permissions maintain their status</li>
                    <li>Pending permissions continue their current workflow</li>
                    <li>Denied permissions restart approval process</li>
                    <li>New permissions start fresh approval chain</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <div>
                  <h4 className="font-medium text-amber-900">Additional Requirements</h4>
                  <p className="text-amber-800">
                    Some permissions require additional documentation:
                  </p>
                  <ul className="list-disc pl-5 text-amber-800 mt-2">
                    <li>GLR (Governance Lifecycle Review)</li>
                    <li>API Scan Results</li>
                    <li>ASA (Application Security Assessment)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </HelpSection>
      </div>

      {/* FAQ Section at the bottom */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <FAQ />
      </div>
    </div>
  );
}