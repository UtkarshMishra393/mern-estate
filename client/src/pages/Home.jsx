import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from './../components/ListingItem';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListings);

  useEffect(()=> {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        // by calling the fetch rent listing function here it will fetch the rent listings after the full fetch of offer listings
        // so it will be more like scrolling and getting more data.
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        // by calling the fetch sale listing function here it will fetch the sale listings after the full fetch of rent listings
        // so it will be more like scrolling and getting more data.
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-blue-800'>perfect</span><br/>place with ease</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>Mishra's Estate is the best place to find your next perfect place to live. <br />
        We have a wide range of properties for you to choose from.</div>
        <Link className='text-xs sm:text-sm text-blue-700 font-bold hover:underline' to={"/search"}>
          Let's get started...
        </Link>
      </div>


      {/* swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing) =>
            <SwiperSlide>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover"}} className='h-[600px]' key={listing._id}>
              </div>
            </SwiperSlide>
          )
        }
      </Swiper>



      {/* Listing results for offer, sale and rest */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=all&parking=false&furnished=false&offer=true&sort=created_at&order=desc'}>
                  Show more offers
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  offerListings.map((listing) =>
                    <ListingItem listing={listing} key={listing._id}/>
                  )
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent&parking=false&furnished=false&offer=false&sort=created_at&order=desc'}>
                  Show more places for rent
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  rentListings.map((listing) =>
                    <ListingItem listing={listing} key={listing._id}/>
                  )
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sales</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale&parking=false&furnished=false&offer=false&sort=created_at&order=desc'}>
                  Show more places for sale
                </Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  saleListings.map((listing) =>
                    <ListingItem listing={listing} key={listing._id}/>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
