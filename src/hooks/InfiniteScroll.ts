export const infiniteScroll = (bottomDiv: HTMLDivElement, fn: () => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fn();
        }
      });
    },
    {
      rootMargin: "200px",
      threshold: 0.1,
    },
  );

  observer.observe(bottomDiv);

  return () => {
    observer.disconnect();
  };
};
