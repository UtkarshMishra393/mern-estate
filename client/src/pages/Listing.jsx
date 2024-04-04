import React, { useEffect, useState } from "react";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaSpinner, FaTable } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser._id, listing?.userRef);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    // if we will not use && operator then we will get error if listing is not present.
    <main>
      {loading && (
        <FaSpinner className="h-10 w-10 mx-auto mt-20 animate-spin" />
      )}
      {error && (
        <p className="text-red-500 text-center mt-20">
          Something went wrong! <br />{" "}
          <Link to="/" className="text-blue-700 hover:underline">
            Click here to get back to home
          </Link>
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center
                    no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 gap-4">
            <p className="text-2xl font-bold">
              {listing.name} - ₹{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p
              className="flex items-center font-semibold mt-5 gap-2 text-slate-600
              text-sm"
            >
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 ">
              <p className="bg-red-900 w-full max-w-[200px] text-white font-semibold text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white font-semibold text-center p-1 rounded-md">
                  ₹ {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Description<br/>
              </span>
              <span className="text-yellow-600 font-serif font-semibold text-3xl">
                {listing.description[0]}
              </span>
              {listing.description.slice(1)}
            </p>
            <ul className="font-semibold text-sm
              text-green-900 flex flex-wrap  items-center gap-4">
              {/* whitespace-nowrap is disabling wrap of elements inside <li> when screen is bag. */}
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg"/>
                {listing.bedrooms > 1? `${listing.bedrooms} bedrooms` : `${listing.bedrooms} bedroom`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg"/>
                {listing.bedrooms > 1? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathrooms`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg"/>
                {listing.parking ?  'Parking Spot': 'No Parking'}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg"/>
                {listing.furnished ?  'Furnished': 'Not Furnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={() => setContact(true)} className="bg-slate-700 text-white rounded-lg 
              uppercase hover:opacity-95 p-3">
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}
