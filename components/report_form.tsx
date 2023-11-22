// ReportFrom.tsx
import React, { useState} from 'react'
import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks'
import { ComponentRequestAuth } from './layouts/common'

interface ReportFromProps {
    onClose: () => void;
    onSubmit: (selectedOption: string | null, violationReason: string) => void;
  }
  
const ReportFrom: React.FC<ReportFromProps> = ({
    onClose,
    onSubmit,
  }) => {
    const [violationReason, setViolationReason] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    const options = [
        { value: 'SPAM', label: 'Spam' },
        { value: 'INSULTS', label: 'Lăng mạ' },
        { value: 'ILLEGAL_TRADE', label: 'Giao dịch bất hợp pháp' },
        { value: 'ADULT_CONTENT', label: 'Nội dung người lớn' },
        { value: 'DISCRIMINATION', label: 'Phân biệt đối xử' },
        { value: 'CHEAT', label: 'Gian lận' },
        { value: 'CHILD_ABUSE', label: 'Lạm dụng trẻ em' },
        { value: 'FALSE_CONTENT', label: 'Nội dung giả mạo' },
        { value: 'OTHER', label: 'Khác' },
      ];
      
      const handleOptionClick = (option: string) => {
        setSelectedOption(option === selectedOption ? null : option);
      };
    

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    // console.log('Selected Option:', selectedOption);
    // console.log('Violation Reason:', violationReason);
    onSubmit(selectedOption, violationReason);
    onClose();
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Báo cáo vi phạm
                </h3>
                <div className="mt-2">
                {options.map((option) => (
  <div
    key={option.value}
    onClick={() => handleOptionClick(option.value)}
    className={`${
      selectedOption === option.value ? 'bg-blue-100' : 'hover:bg-gray-100'
    } cursor-pointer rounded-md p-2 mb-1 flex items-center`}
    style={{ width: '222%' }}
  >
    {/* Icon bên trước option đã được chọn */}
    {selectedOption === option.value && (
      <span className="mr-2" role="img" aria-label="selected-icon">
        👉
      </span>
    )}
    {option.label}
  </div>
))}

                <textarea
                    onChange={(e) => setViolationReason(e.target.value)}
                    value={violationReason}
                    className="resize-none border rounded-md w-full h-20 p-2"
                    placeholder="Mô tả vi phạm của bạn..."
                    style={{ width: '222%', margin: '10px 0' }} // Add width style here
                    ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Gửi báo cáo
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFrom;
