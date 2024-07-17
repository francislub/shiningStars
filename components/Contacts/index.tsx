// import NewsLatterBox from "./NewsLatterBox";

const Contacts = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28 -mb-20 lg:-mt-40 lg:mt-0">
      <div className="container">
        <div className=" fade-in my-24 " style={{marginTop:'5%'}} id='fees'> 
          <h1 className='font-bold text-black text-center'>
                Send Us a Direct Email
          </h1>

          <form className='flex flex-col space-y-4' action="">
                <input
                className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="email"
                required
                placeholder='Your Email'
                />
                <input
                className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="tel Number"
                placeholder='Contact'
                />
                <textarea
                className='rounded-md border border-gray-300 px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
                placeholder='Message'
                />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Send
                </button>
          </form>
      </div>
      </div>
    </section>
  );
};

export default Contacts;
