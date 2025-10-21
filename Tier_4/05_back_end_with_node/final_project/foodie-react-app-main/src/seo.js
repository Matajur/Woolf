export const getSeo = (pageName) => {
  switch (pageName) {
    case "home":
      return {
        title: "Foodies Wellcome",
        meta: [{ name: "description", content: "Foodies Wellcome." }],
      };

    default:
      return {
        title: `Foodies`,
        meta: [
          { name: "description", content: "Improve Your Culinary Talents" },
        ],
      };
  }
};
