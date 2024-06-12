import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/shopSlice';
import { useParams } from 'react-router';
import CategoryLinks from './CategoryLinks';
import Ad from './Ad';
import { Link } from 'react-router-dom';
import { addItem } from '../features/shopSlice';

function productPage() {
    const dispatch = useDispatch()
    const state = useSelector((shop) => shop.shop.data)
    const { id } = useParams();
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(fetchData());
    }, []);

    const product = state ? state.find(product => product.slug === id) : null

    const splitByTag = (str) => {
      return str.split("<br>")
    }

  return (
    <div className='px-6 md:px-10 md:pt-8'>
      <div className='py-4 md:pb-6 md:pt-0'>
        <Link to="/" className='text-sbase font-medium text-bordergrey'>Go Back</Link>
      </div>
      <section>
        <div className='md:flex md:gap-16 md:mb-32'>
          <div className='md:bg-greywhite md:min-h-[480px] md:w-72 md:rounded-lg md:flex md:items-center'>
            <img className='mb-8 md:mb-0' src={product ? product.img : null} alt="product img"/>
          </div>
          <div className='md:w-1/2 md:flex md:flex-col pt-12'>
            <p className='text-darkorange text-sbase tracking-[10px] mb-6 md:text-xs md:tracking-[8.57px] md:mb-4'>{product ? product.newP ? "NEW PRODUCT" : null : null}</p>
            <h1 className='text-28xl font-bold text-black2 mb-6 tracking-[1px] md:mb-8'>{product ? product.name : null}</h1>
            <p className='text-sbase text-bordergrey font-medium mb-6 md:mb-8'>{product ? product.description : null}</p>
            <p className='text-lg text-black2 font-bold mb-8 tracking-[1.29px]'>$ {product ? product.price : null}</p>
            <div className='flex mb-24'>
              <div className='flex w-1/2'>
                <div className='flex w-[120px] h-[48px] bg-greywhite'>
                  <button onClick={count > 0 ? (e) => {setCount(count - 1)} : null} className='w-1/3'>-</button>
                  <input value={count} className='w-1/3 bg-greywhite text-center' disabled={true}></input>
                  <button onClick={(e) => {setCount(count + 1)}} className='w-1/3'>+</button>
                </div>
              </div>
              <div className='w-1/2 flex items-center justify-end'>
                <button onClick={() => {dispatch(addItem({ id: product._id, quantity: count, img: product.img, price: product.price, name: product.shortname })), setCount(0)}} className='bg-darkorange text-white px-8 py-4 text-lxs'>ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
        <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px]'>FEATURES</h2>
        <p className='text-sbase text-bordergrey font-medium mb-6'>{product ? splitByTag(product.features)[0] : null}</p>
        <p className='text-sbase text-bordergrey font-medium mb-28 md:mb-32'>{product ? splitByTag(product.features)[1] : null}</p>
        <div className='md:flex md:justify-between'>
          <h2 className='text-2xl text-black2 font-bold mb-6 tracking-[0.86px] md:text-32xl md:tracking-[1.14px]'>IN THE BOX</h2>
          <div className='md:flex md:flex-col'>
            {product ? product.includes.map((item, index) => {
              return ( 
              <div key={index} className='flex gap-5 mb-2 md:gap-8'>
                <p className='text-sbase text-darkorange font-medium'>{item.quantity}x</p>
                <p className='text-sbase text-bordergrey font-medium'>{item.item}</p>
              </div>
              )
            }) : null}
          </div>
        </div>
        <div className='md:flex md:gap-5 md:mt-32 md:mb-32'>
          <div>
            <img className='mt-24 mb-4 md:mt-0 md:mb-5 md:w-[277px] md:h-[174px]' src={product ? product.gallery.first.mobile : null} alt="gallery1" />
            <img className='mb-4 md:mb-0 md:w-[277px] md:h-[174px]' src={product ? product.gallery.second.mobile : null} alt="gallery2" />
          </div>
          <img className='mb-32 md:mb-0 md:w-[395px] md:h-[368px]' src={product ? product.gallery.third.mobile : null} alt="gallery2" />
        </div>
        <div className='flex flex-col'>
          <h3 className='text-2xl text-black2 font-bold text-center mb-10 tracking-[0.86px] md:text-32xl md:tracking-[1.14px] md:mb-14'>YOU MAY ALSO LIKE</h3>
          <div className='md:flex md:gap-3'>
            {product ? product.others.map((item, index) => {
              return (
                <div key={index} className='flex flex-col items-center mb-32'>
                  <img className='mb-8 md:hidden md:absolute' src={item.image.mobile} />
                  <img className='mb-10 hidden absolute md:flex md:relative' src={item.image.tablet} />
                  <p className='text-2xl font-bold text-black2 text-center mb-8 md:tracking-[1.71px]'>{item.name}</p>
                  <Link to={"/product/" + item.slug} className='bg-darkorange text-white px-8 py-4'>SEE PRODUCT</Link>
                </div>
              )
            }) : null}
          </div>
        </div>
        <CategoryLinks />
        <Ad />
      </section>
    </div>
  )
}

export default productPage
