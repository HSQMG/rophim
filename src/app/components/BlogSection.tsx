"use client";

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      category: "FASHION",
      date: "17 THÁNG CHÍN, 2022",
      title: "THE 7 VERY BEST BIKINI TRIMMERS",
      img: "/home/image1.jpg",
    },
    {
      id: 2,
      category: "FASHION",
      date: "17 THÁNG CHÍN, 2022",
      title: "THE VERY BEST WORKOUT SHOES FOR WOMEN",
      img: "/home/image2.jpg",
    },
    {
      id: 3,
      category: "FASHION",
      date: "17 THÁNG CHÍN, 2022",
      title: "ANNA FIELDING, STRATEGIST UK CONTRIBUTOR",
      img: "/home/image3.jpg",
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
          THỜI TRANG & XU HƯỚNG
        </h2>
        <div className="w-20 h-[2px] bg-gray-400 mx-auto my-4"></div>
        <p className="text-gray-500 italic">
          Thông tin thời trang & xu hướng mới nhất, được cập nhật mỗi ngày, mời
          các bạn độc giả lặn hưởng
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="text-center">
              <div className="w-[280px] h-[280px] mx-auto overflow-hidden rounded-full">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs uppercase text-gray-500 mt-4">
                <span className="font-semibold text-gray-700">
                  {post.category}
                </span>{" "}
                / {post.date}
              </p>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
