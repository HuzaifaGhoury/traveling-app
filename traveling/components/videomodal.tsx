import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
{isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-70" onClick={onClose}></div>
          <div className="relative z-10 bg-white p-8 rounded-lg">
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/E6fefQGxg7g"
  title="Tour Video"
  frameBorder="0"
  allowFullScreen
>
</iframe>
<button className="mt-4 p-2 rounded  border border-white-200  w-32 font-bold text-slate-400" onClick={onClose}>
Close
</button>
</div>
</div>
)}
    </>
  );
};

export default VideoModal;