import { Shield, FileText, Users, CheckCircle2, XCircle, Clock, AlertTriangle, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function UserGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              User Guide
            </h1>
            <p className="text-green-100">
              Complete guide to requesting and managing Graph permissions
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Getting Started */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              The Graph Permissions system helps you request and manage Microsoft Graph API permissions for your applications. Follow these steps to get started:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Before You Begin</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Identify required permissions from Microsoft Graph documentation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Prepare business justification for each permission</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Gather required documentation (GLR, API Scan results if needed)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-amber-900 mb-4">Important Notes</h3>
                <ul className="space-y-3 text-amber-800">
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Some permissions require additional documentation</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Approval times vary based on permission complexity</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Approved permissions cannot be modified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Request Process */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Request Process</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">1. Creating a Request</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Select Permissions</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Use the permission selector to browse available permissions</li>
                    <li>Choose between Application and Delegated permission types</li>
                    <li>Review permission descriptions and requirements</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Provide Justification</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Enter detailed business justification for each permission</li>
                    <li>Explain specific use cases and requirements</li>
                    <li>Reference relevant project or business needs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Additional Requirements</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Upload required GLR documentation if applicable</li>
                    <li>Attach API Scan results when needed</li>
                    <li>Provide links to relevant resources</li>
                    <li>List affected sites and environments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">2. Tracking Your Request</h3>
              <div className="space-y-4 text-gray-600">
                <p>Monitor your request progress through the dashboard:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-medium text-gray-900">Pending</span>
                    </div>
                    <p className="text-sm">Request is under review by approvers</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium text-gray-900">Approved</span>
                    </div>
                    <p className="text-sm">Permission approved but not yet implemented</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium text-gray-900">Denied</span>
                    </div>
                    <p className="text-sm">Permission denied - requires revision</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">3. Handling Denials</h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">If Your Request is Denied:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-red-800">
                    <li>Review denial comments and reasons</li>
                    <li>Click "Revise Permission" on the denied permission</li>
                    <li>Update justification or provide additional documentation</li>
                    <li>Resubmit the revised request</li>
                  </ol>
                  <div className="mt-4 text-sm text-red-700">
                    Note: Approved permissions remain locked while you revise denied ones
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-900">Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-900 mb-4">Do's</h3>
              <ul className="space-y-3">
                {[
                  "Provide detailed justification for each permission",
                  "Include specific use cases and examples",
                  "Submit all required documentation upfront",
                  "Keep track of your request status",
                  "Respond promptly to reviewer comments"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-emerald-800">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-red-900 mb-4">Don'ts</h3>
              <ul className="space-y-3">
                {[
                  "Request permissions without clear justification",
                  "Submit incomplete documentation",
                  "Ignore reviewer comments or feedback",
                  "Request more permissions than needed",
                  "Delay responding to approval requests"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-red-800">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}