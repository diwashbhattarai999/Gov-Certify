const TESTIMONIALS = [
  {
    name: "Sunita Sharma",
    feedback: "The service was very good and fast. Highly recommended!",
  },
  {
    name: "Rajesh Thapa",
    feedback:
      "The process is very user-friendly. I received my certificate on time.",
  },
  {
    name: "Priya Gurung",
    feedback: "The website is easy to use and the process is straightforward.",
  },
  {
    name: "Anil Bhattarai",
    feedback:
      "I didn't face any problems with my certificate. I highly recommend this!",
  },
  {
    name: "Saraswati Shrestha",
    feedback: "Excellent customer service and fast processing. Thank you!",
  },
  {
    name: "Ravi Khanal",
    feedback: "Good, easy, and professional. Will use again.",
  },
  {
    name: "Anjali Bhandari",
    feedback: "The certificate was presented immediately. Very satisfied!",
  },
  {
    name: "Ramesh Tamang",
    feedback:
      "The service provided was excellent, although I'm still awaiting my certificate.",
  },
  {
    name: "Nisha Lama",
    feedback:
      "I am impressed with the professionalism and efficiency of the service. Received my certificate without any hassle.",
  },
  {
    name: "Rajendra Magar",
    feedback:
      "Quick response and smooth process. Highly satisfied with the service provided.",
  },
];

const Testimonials = () => (
  <section className="my-20">
    <h2 className="text-2xl font-bold text-center">Testimonials</h2>
    <div className="w-20 h-1 bg-accent mx-auto rounded-full mt-2"></div>
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
      {TESTIMONIALS.map((testimonial, index) => (
        <div
          key={index}
          className={`border p-4 rounded shadow flex flex-col items-start justify-between gap-2 ${
            index % 5 === 0 ? "row-span-2" : ""
          }`}
        >
          <p className="italic text-base">
            &ldquo;{testimonial.feedback}&rdquo;
          </p>
          <p className="mt-4 font-bold text-right text-base">
            - {testimonial.name}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
