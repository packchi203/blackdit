import { Fragment, useEffect, useRef, useState } from 'react';
import { BellIcon, FlagIcon, ShareIcon } from '@heroicons/react/24/outline';
import { ComponentRequestAuth } from './layouts/common';
import HeroIcon from './hero_icon';
import { useAuth, useBookmarks } from '@/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import ReportFrom from './report_form';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

interface PropsComponent {
  id: number;
  subject: string;
  isBookmark: boolean;
}

export function FunctionallyButtons({ id, subject, isBookmark }: PropsComponent) {
  const router = useRouter();
  const { profile, fistLoading } = useAuth();
  const [statusBookmark, setStatusBookmark] = useState(isBookmark);
  const { bookmarkPost, bookmarkComment } = useBookmarks();
  const [load, setLoad] = useState(false);
  const [share, setShare] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  let linkShare = 'https://itforum.site' + router?.asPath;
  // let linkShare = 'https://localhost:3000' + router?.asPath;
  useEffect(() => {
    setStatusBookmark(isBookmark);
  }, [isBookmark]);

  useEffect(() => {
    if (!profile?.name) {
      setStatusBookmark(false);
    }
  }, [profile?.name]);

  const handleBookmark = async (e: any) => {
    e.preventDefault();
    if (!profile.name) {
      return;
    }
    setLoad(true);
    setStatusBookmark(!statusBookmark);
    try {
      setStatusBookmark(!statusBookmark);
      if (subject == 'POST') {
        await bookmarkPost(id).then((res: any) => {
          if (res.status == 200) {
            setStatusBookmark(res.data);
            setLoad(false);
            return;
          }
          setStatusBookmark(res);
          setLoad(false);
        });
      } else if (subject == 'COMMENT') {
        await bookmarkComment(id).then((res: any) => {
          if (res.status == 200) {
            setStatusBookmark(res.data);
            setLoad(false);
            return;
          }
          setStatusBookmark(res);
          setLoad(false);
        });
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  const submitReport = async (selectedOption: string | null, violationReason: string | null) => {
    // Ensure that selectedOption and violationReason are not null before proceeding
    if (selectedOption === null || violationReason === null) {
      console.error('Invalid report data');
      return;
    }

    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNoY2hpMjAwM3ZuQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlzcyI6IkFQVEVDSCIsImV4cCI6MTcwMTI0NDQ5M30.dbh_DUAHtryyZwE14RUJ_lZuRwHIwnl3Z5_4Krpb0js';

    if (!profile?.name) {
      // Show a toast message indicating that the user needs to log in
      toast.error('Bạn cần đăng nhập trước khi báo cáo.', {
        icon: '❌',
      });
      return;
    }

    // Prepare the report data
    const reportData = {
      postId: id,
      username: profile?.name,
      reportType: selectedOption,
      reason: violationReason,
      reportStatus: 'PENDING',
    };
    try {
      const response = await fetch('http://localhost:8080/api/reports/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify(reportData),
      });
  
      if (response.ok) {
        // Display success toast
        toast.success('Đã báo cáo bài viết thành công!', {
          icon: '✅',
        });
  
        console.log('Report submitted successfully');
      } else {
        // Display error toast
        toast.error('An error occurred while updating the report.', {
          icon: '❌',
        });
  
        console.error('Failed to submit report');
      }
    } catch (error) {
      // Display error toast
      toast.error('An error occurred while updating the report.', {
        icon: '❌',
      });
  
      console.error('Error sending report:', error);
    }
  
    // Close the report modal
    setShowReportModal(false);
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <ComponentRequestAuth>
          <button
            disabled={load}
            onClick={handleBookmark}
            className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'
          >
            <HeroIcon
              name='BookmarkIcon'
              className='w-5 h-45  text-gray-400'
              outline={statusBookmark}
            />
            <span className='ml-1 font-medium hidden md:block'>Lưu lại</span>
          </button>
        </ComponentRequestAuth>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
              <ShareIcon className='w-5 h-5 text-gray-400' />
              <span className='ml-1 font-medium hidden md:block'>Chia sẻ</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      target={'_blank'}
                      href={`https://www.facebook.com/sharer.php?u=${linkShare}`}
                    >
                      <a
                        target={'_blank'}
                        className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'
                      >
                        Facebook
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      target={'_blank'}
                      href={`https://twitter.com/intent/tweet?text=${linkShare}`}
                    >
                      <a
                        target={'_blank'}
                        className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'
                      >
                        Twitter
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      target={'_blank'}
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${linkShare}`}
                    >
                      <a
                        target={'_blank'}
                        className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'
                      >
                        LinkedIn
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      target={'_blank'}
                      href={`https://www.reddit.com/submit?url=${linkShare}`}
                    >
                      <a
                        target={'_blank'}
                        className=' hover:bg-gray-50 py-2 flex text-sm px-2 rounded-lg'
                      >
                        Reddit
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <ComponentRequestAuth>
          <button
            className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'
            onClick={handleReport}
          >
            <FlagIcon className='w-5 h-5 text-gray-400' />
            <span className='ml-1 font-medium hidden md:block'>Báo cáo</span>
          </button>
        </ComponentRequestAuth>
      </div>
      {/* Conditionally render the ReportFrom */}
      {showReportModal && (
        <ReportFrom
          onClose={() => setShowReportModal(false)}
          onSubmit={(selectedOption, violationReason) => submitReport(selectedOption, violationReason)}
        />
      )}
    </>
  );
}
