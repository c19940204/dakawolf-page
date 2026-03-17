const years = Array.from({ length: 11 }, (_, index) => 2016 + index);

window.projectData = {
  commercial: [
    {
      title: "Commercial Project A",
      role: "Gameplay / System",
      description: "Replace with your real commercial project summary.",
      image: "images/project-commercial-01.svg",
    },
    {
      title: "Commercial Project B",
      role: "Level / Tech Design",
      description: "Replace with your real commercial project summary.",
      image: "images/project-commercial-02.svg",
    },
  ],
  private: [
    {
      title: "Private Project A",
      role: "Solo Dev",
      description: "Replace with your private game project details.",
      image: "images/project-private-01.svg",
    },
    {
      title: "Private Project B",
      role: "Prototype",
      description: "Replace with your private game project details.",
      image: "images/project-private-02.svg",
    },
  ],
};

window.commissionByYear = Object.fromEntries(
  years.map((year) => [
    String(year),
    [
      {
        image: "images/commission-placeholder-a.svg",
        artistName: "Artist Name",
        artistUrl: "https://example.com",
      },
      {
        image: "images/commission-placeholder-b.svg",
        artistName: "Artist Name",
        artistUrl: "https://example.com",
      },
    ],
  ])
);

window.myArtByYear = Object.fromEntries(
  years.map((year) => [
    String(year),
    [
      { image: "images/my-art-vertical.svg", caption: "Artwork note" },
      { image: "images/my-art-wide.svg", caption: "Artwork note" },
      { image: "images/my-art-square.svg", caption: "Artwork note" },
      { image: "images/my-art-vertical.svg", caption: "Artwork note" },
      { image: "images/my-art-wide.svg", caption: "Artwork note" },
      { image: "images/my-art-square.svg", caption: "Artwork note" },
    ],
  ])
);