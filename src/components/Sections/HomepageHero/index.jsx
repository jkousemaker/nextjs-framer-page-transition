/* This example requires Tailwind CSS v2.0+ */

import Image from "next/image";

const features = [
  {
    name: "Analytics",
    href: "#",
    description:
      "Get a better understanding of where your traffic is coming from.",
  },
  {
    name: "Engagement",
    href: "#",
    description: "Speak directly to your customers in a more meaningful way.",
  },
  {
    name: "Security",
    href: "#",
    description: "Your customers' data will be safe and secure.",
  },
  {
    name: "Integrations",
    href: "#",
    description: "Connect with third-party tools that you're already using.",
  },
  {
    name: "Automations",
    href: "#",
    description:
      "Build strategic funnels that will drive your customers to convert",
  },
];
const callsToAction = [
  {
    name: "Watch Demo",
    href: "#",
    resources: [
      {
        name: "Help Center",
        description:
          "Get all of your questions answered in our forums or contact support.",
        href: "#",
      },
    ],
  },
];

const recentPosts = [
  { id: 1, name: "Boost your conversion rate", href: "#" },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
  },
  { id: 3, name: "Improve your customer experience", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="relative bg-gray-50">
      <main>
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center">
          <div className=" px-8">
            <h1 className=" tracking-tight font-extrabold text-gray-900 text-5xl">
              <span className="block">Data to enrich your</span>{" "}
              <span className="block text-indigo-600">online business</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto  text-gray-500 text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="mt-3 rounded-md shadow  ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow  ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-72">
          <Image
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
