const links = {
  twitter: "https://twitter.com/ngocla99",
  github: "https://github.com/ngocla99/3h-money-share",
  githubAccount: "https://github.com/ngocla99",
  linkedin: "https://www.linkedin.com/in/ngocla99",
  facebook: "https://www.facebook.com/ngocla99",
};

export const siteConfig = {
  name: "Money Share",
  links,
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Products",
          href: "/",
          description: "All the products we have to offer.",
          items: [],
        },
        {
          title: "Build a Board",
          href: "/",
          description: "Build your own custom skateboard.",
          items: [],
        },
        {
          title: "Blog",
          href: "/",
          description: "Read our latest blog posts.",
          items: [],
        },
      ],
    },
    // { title: "Bills", href: "/bills" },
    { title: "Groups", href: "/groups" },
  ],
  footerNav: [
    {
      title: "Help",
      items: [
        {
          title: "About",
          href: "/pages/about",
          external: false,
        },
        {
          title: "Contact",
          href: "/pages/Contact",
          external: false,
        },
        {
          title: "Terms",
          href: "/pages/terms",
          external: false,
        },
        {
          title: "Privacy",
          href: "/pages/privacy",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Linkedin",
          href: links.linkedin,
          external: true,
        },
        {
          title: "Facebook",
          href: links.facebook,
          external: true,
        },
      ],
    },
  ],
};
