import { Shield, Cog, Users, CheckCircle2, XCircle, Clock, AlertTriangle, FileText } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

export function AdminGuide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3">
          <Cog className="h-8 w-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Administrator Guide
            </h1>
            <p className="text-purple-100">
              Complete guide to managing and approving Graph permission requests
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Administrator Overview</h2>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              As an administrator, you are responsible for reviewing, approving, or denying Graph API permission requests. This guide will help you understand the approval process and best practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-4">Key Responsibilities</h3>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Review permission requests thoroughly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Validate business justifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Ensure compliance with security policies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Provide clear feedback on denials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-purple-900 mb-4">Access Levels</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-purple-900">Business Approver</p>
                      <p className="text-sm text-purple-800">Reviews business justification and initial approval</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Cog className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-purple-900">Technical Approver</p>
                      <p className="text-sm text-purple-800">Validates technical requirements and security compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-purple-900">AM Team</p>
                      <p className="text-sm text-purple-800">Handles final approval and implementation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Process */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Review Process</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">1. Initial Review</h3>
              <div className="space-y-4 text-gray-600">
                <p>When reviewing a new request:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Check the business justification for each permission</li>
                  <li>Verify that requested permissions match stated needs</li>
                  <li>Review any attached documentation</li>
                  <li>Ensure compliance with organizational policies</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">2. Documentation Review</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Required Documentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                    <div>
                      <p className="font-medium mb-2">GLR Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Business justification</li>
                        <li>Data handling procedures</li>
                        <li>Security controls</li>
                        <li>Risk assessment</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">API Scan Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Scan results</li>
                        <li>Vulnerability assessment</li>
                        <li>Remediation plan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">3. Decision Making</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Approval Criteria</h4>
                  <ul className="list-disc pl-5 space-y-2 text-green-800">
                    <li>Clear business justification</li>
                    <li>Complete documentation</li>
                    <li>Security compliance</li>
                    <li>Appropriate permission scope</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Denial Reasons</h4>
                  <ul className="list-disc pl-5 space-y-2 text-red-800">
                    <li>Insufficient justification</li>
                    <li>Missing documentation</li>
                    <li>Security concerns</li>
                    <li>Over-privileged requests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Cog className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Implementation Guidelines</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Process</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                    <li>Verify all approvals are complete</li>
                    <li>Check technical requirements</li>
                    <li>Implement permissions in Graph API</li>
                    <li>Document implementation details</li>
                    <li>Notify requestor of completion</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Post-Implementation</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc pl-5 space-y-3 text-gray-700">
                    <li>Update request status to "Implemented"</li>
                    <li>Record implementation details</li>
                    <li>Monitor for any issues</li>
                    <li>Maintain audit trail</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-medium text-yellow-900">Important Considerations</h3>
              </div>
              <ul className="space-y-3 text-yellow-800">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <span>Monitor implementation timeframes</span>
                </li>
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <span>Ensure security measures are in place</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <span>Maintain clear communication with requestors</span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <span>Keep detailed implementation records</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}