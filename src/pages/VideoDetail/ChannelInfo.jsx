import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

const ChannelInfo = ({ video }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4 ">
        <img
          src={video.channelThumbnail[0].url}
          alt=""
          className="rounded-full w-12 h-12"
        />
        <div>
          <h4 className="font-bold">{video.channelTitle}</h4>
          <p className="text-gray-400">{video.subscriberCountText}</p>
        </div>

        <button className="bg-white text-black h-9 rounded-full p-2 transition duration-[400ms] hover:bg-gray-400">
          Abone Ol
        </button>
      </div>

      <div className="flex justify-between items-center rounded-full bg-[#272727] cursor-pointer ">
        <div className="py-2 px-6 border-r">
          <AiFillLike />
        </div>
        <div className="py-2 px-6">
          <AiFillDislike />
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;