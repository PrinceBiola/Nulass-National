import React, { useState } from 'react';
import {
  BanknotesIcon,
  UserGroupIcon,
  CalculatorIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const steps = [
  { id: 1, name: 'Select Employees', icon: UserGroupIcon },
  { id: 2, name: 'Calculate Payroll', icon: CalculatorIcon },
  { id: 3, name: 'Review & Approve', icon: DocumentCheckIcon },
  { id: 4, name: 'Process Payment', icon: BanknotesIcon },
];

function PayrollWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Steps Progress */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center ${index !== 0 ? 'ml-6' : ''}`}>
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-full
                  ${currentStep > step.id ? 'bg-green-100' : currentStep === step.id ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                  {currentStep > step.id ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                  ) : (
                    <step.icon className={`w-6 h-6 ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${currentStep === step.id ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {step.name}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 ml-4 mr-4">
                  <div className={`h-0.5 ${currentStep > step.id + 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Select Employees for Payroll</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((employee) => (
                <div key={employee} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-500">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Calculate Payroll</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">Basic Salary</h4>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Base Pay</span>
                    <span className="text-sm font-medium text-gray-900">₦400,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Allowances</span>
                    <span className="text-sm font-medium text-gray-900">₦50,000</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">Deductions</h4>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tax (PAYE)</span>
                    <span className="text-sm font-medium text-gray-900">-₦30,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Pension</span>
                    <span className="text-sm font-medium text-gray-900">-₦20,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review & Approve</h3>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <DocumentCheckIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800">
                    Please review the payroll details carefully before proceeding
                  </p>
                </div>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">John Doe</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₦450,000</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₦50,000</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₦400,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Process Payment</h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-900">Bank Transfer</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment-method"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm text-gray-900">Mobile Money</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900">Payment Summary</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Employees</span>
                    <span className="text-sm font-medium text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="text-sm font-medium text-gray-900">₦1,200,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length) {
                setProcessing(true);
                setTimeout(() => {
                  setProcessing(false);
                  // Handle completion
                }, 2000);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {processing ? (
              <>
                <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : currentStep === steps.length ? (
              'Process Payment'
            ) : (
              'Next Step'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayrollWizard; 