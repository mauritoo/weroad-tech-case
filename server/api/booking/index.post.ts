export default defineEventHandler((event) => {
  return {
    id: 10,
    travel: {
      id: 5,
      price: 1770,
      picture:
        "https://strapi-imaginary.weroad.it/resource/webp-large/32918/Peru-machu-picchu-landscape-coordinator.webp",
      rating: 5,
      name: "Exclusive Peru: Machu Picchu, Rainbow Mountain and Lake Titicaca",
      description:
        "Get ready for an exceptional Peruvian adventure that stands apart! Our journey represents the pinnacle of travel escapades, offering extraordinary activities and distinctive, top-tier accommodations. It's an elite travel experience where incredible activities and unique, select lodgings take centre stage.",
      departure_date: "2024-05-01T05:49:39 +03:00",
      return_date: "2024-05-15T11:32:56 +03:00",
    },
    customer: {
      name: "Mick Jagger",
      email: "mick@gmail.com",
      phoneNumber: "+35492216305916",
      birthDate: "1986-10-10",
      gender: "Male",
    },
    paymentType: "Credit transfer",
    notes: "",
  };
});
