// import NewsLatterBox from "./NewsLatterBox";

const Contacts = () => {
  return (
    <section id="contact" className="overflow-hidden pb-16 md:pb-20">
      <div className="container">
        <div className=" fade-in mb-24 w-[600px] mx-auto" style={{marginTop:'5%'}} id='fees'> 
          <h1 className='font-bold text-xl text-black/90 mb-3'>
                Send Us a Direct Email
          </h1>
          <h2 className="my-3 text-body-color">
            Contact us directly and we will get back to you. For any inquiries, feel free to use the form below.
          </h2>

          <form className='flex flex-col space-y-4' action="">
                <input
                className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="email"
                required
                placeholder='Your Email'
                />
                <input
                className='rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type="text"
                placeholder='Subject'
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
