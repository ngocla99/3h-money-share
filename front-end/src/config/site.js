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
  mainNav: [],
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
