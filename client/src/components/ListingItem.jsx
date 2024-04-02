import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

// to use the line-clamp css to truncate lines to 2 rows we have 
// installed a plugin that provides utilities for visually truncating text after a fixed number of lines.
// plugin:- @tailwindcss/line-clamp - from github.
export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-xl transition-shadow overflow-hidden rounded-xl w-full sm:w-[330px]'>

        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing Cover"
            className='h-[320px] sm:h-[220px] w-full object-cover 
            hover:scale-105 transition-scale duration-300' />
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='text-lg font-bold text-yellow-700 truncate'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-5 w-5 text-green-700'/>
                    <p className='truncate font-semibold text-sm text-gray-600 w-full'>{listing.address}</p>
                </div>
                <p className='text-sm textgray-600 line-clamp-2'>{listing.description}</p>
                <p className='text-slate-500 mt-2 font-semibold'>
                    ₹
                    {listing.offer ? listing.discountPrice.toLocaleString("en-US") : 
                    listing.regularPrice.toLocaleString("en-US")}
                    {listing.type === 'rent' ? ' /month' : ''}
                </p>
                <div className='text-blue-900 flex gap-4'>
                    <div className='font-bold text-sx'>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bedroom`}
                    </div>
                    <div className='font-bold text-sx'>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}
                    </div>
                </div>
            </div>
        </Link>

    </div>
  )
}
