import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Permissions',
    question: "What is the difference between Application and Delegated permissions?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Application permissions:</strong> Allow the app to access data without a signed-in user.
          These permissions are typically used for background services or daemons.
        </p>
        <p>
          <strong>Delegated permissions:</strong> Allow the app to access data on behalf of the signed-in user.
          The app's access is limited by the user's permissions.
        </p>
      </div>
    )
  },
  {
    category: 'Permissions',
    question: "Why was my permission request denied?",
    answer: (
      <div className="space-y-2">
        <p>Permission requests may be denied for several reasons:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Insufficient justification provided</li>
          <li>Missing required documentation</li>
          <li>Security concerns identified</li>
          <li>Non-compliance with policies</li>
        </ul>
        <p className="text-sm text-gray-600 mt-2">
          Check the denial comments in your request details for specific reasons and guidance on how to revise your request.
        </p>
      </div>
    )
  },
  {
    category: 'Documentation',
    question: "What documents are required for GLR?",
    answer: (
      <div className="space-y-2">
        <p>The following documents are required for GLR approval:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Business justification document</li>
          <li>Data handling procedures</li>
          <li>Security controls documentation</li>
          <li>Risk assessment report</li>
          <li>Data flow diagrams</li>
        </ul>
      </div>
    )
  },
  {
    category: 'Process',
    question: "How long does the approval process take?",
    answer: (
      <div className="space-y-2">
        <p>The approval timeline varies based on the request complexity:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Standard requests: 1-3 business days</li>
          <li>Requests requiring API scans: 1-3 business days</li>
          <li>Complex requests with multiple approvers: 1-3 business days</li>
        </ul>
      </div>
    )
  },
  {
    category: 'Process',
    question: "Can I modify an approved permission?",
    answer: (
      <div className="space-y-2">
        <p>No, approved permissions are locked and cannot be modified. If you need changes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Submit a new request for different permissions</li>
          <li>Keep existing approved permissions active</li>
          <li>Provide justification for the new requirements</li>
        </ul>
      </div>
    )
  },
  {
    category: 'Process',
    question: "What should I do if I need urgent approval?",
    answer: (
      <div className="space-y-2">
        <p>For urgent requests:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Mark your request as urgent in the justification</li>
          <li>Contact your Business Approver directly</li>
          <li>Provide clear business impact documentation</li>
          <li>Include timeline requirements</li>
        </ol>
        <p className="text-sm text-gray-600 mt-2">
          Note: All requests still follow the standard approval process, but urgent requests may be prioritized.
        </p>
      </div>
    )
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <div className="flex items-start">
                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {faq.category}
                </span>
              </div>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="px-6 pb-4 text-sm text-gray-600 bg-gray-50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or category filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}