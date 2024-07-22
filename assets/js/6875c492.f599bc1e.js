"use strict";(self.webpackChunkpersonal_blog=self.webpackChunkpersonal_blog||[]).push([[813],{7713:(e,t,s)=>{s.d(t,{A:()=>l});s(6540);var a=s(1312),n=s(9022),r=s(4848);function l(e){const{metadata:t}=e,{previousPage:s,nextPage:l}=t;return(0,r.jsxs)("nav",{className:"pagination-nav","aria-label":(0,a.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[s&&(0,r.jsx)(n.A,{permalink:s,title:(0,r.jsx)(a.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer Entries"})}),l&&(0,r.jsx)(n.A,{permalink:l,title:(0,r.jsx)(a.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older Entries"}),isNext:!0})]})}},3892:(e,t,s)=>{s.d(t,{A:()=>l});s(6540);var a=s(7131),n=s(1267),r=s(4848);function l(e){let{items:t,component:s=n.A}=e;return(0,r.jsx)(r.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,r.jsx)(a.i,{content:t,children:(0,r.jsx)(s,{children:(0,r.jsx)(t,{})})},t.metadata.permalink)}))})}},3069:(e,t,s)=>{s.r(t),s.d(t,{default:()=>f});s(6540);var a=s(4164),n=s(1312),r=s(5846),l=s(1213),i=s(7559),o=s(8774),c=s(6535),d=s(7713),m=s(1463),u=s(3892),g=s(996),h=s(1107),x=s(4848);function p(e){const t=function(){const{selectMessage:e}=(0,r.W)();return t=>e(t,(0,n.T)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:t}))}();return(0,n.T)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:t(e.count),tagName:e.label})}function j(e){let{tag:t}=e;const s=p(t);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(l.be,{title:s,description:t.description}),(0,x.jsx)(m.A,{tag:"blog_tags_posts"})]})}function b(e){let{tag:t,items:s,sidebar:a,listMetadata:r}=e;const l=p(t);return(0,x.jsxs)(c.A,{sidebar:a,children:[t.unlisted&&(0,x.jsx)(g.A,{}),(0,x.jsxs)("header",{className:"margin-bottom--xl",children:[(0,x.jsx)(h.A,{as:"h1",children:l}),t.description&&(0,x.jsx)("p",{children:t.description}),(0,x.jsx)(o.A,{href:t.allTagsPath,children:(0,x.jsx)(n.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View All Tags"})})]}),(0,x.jsx)(u.A,{items:s}),(0,x.jsx)(d.A,{metadata:r})]})}function f(e){return(0,x.jsxs)(l.e3,{className:(0,a.A)(i.G.wrapper.blogPages,i.G.page.blogTagPostListPage),children:[(0,x.jsx)(j,{...e}),(0,x.jsx)(b,{...e})]})}},996:(e,t,s)=>{s.d(t,{A:()=>g});s(6540);var a=s(4164),n=s(1312),r=s(5260),l=s(4848);function i(){return(0,l.jsx)(n.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,l.jsx)(n.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,l.jsx)(r.A,{children:(0,l.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=s(7559),m=s(7293);function u(e){let{className:t}=e;return(0,l.jsx)(m.A,{type:"caution",title:(0,l.jsx)(i,{}),className:(0,a.A)(t,d.G.common.unlistedBanner),children:(0,l.jsx)(o,{})})}function g(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{}),(0,l.jsx)(u,{...e})]})}},1267:(e,t,s)=>{s.d(t,{A:()=>L});s(6540);var a=s(4164),n=s(7131),r=s(4848);function l(e){let{children:t,className:s}=e;return(0,r.jsx)("article",{className:s,children:t})}var i=s(8774);const o={title:"title_xvU1"};function c(e){let{className:t}=e;const{metadata:s,isBlogPostPage:l}=(0,n.e)(),{permalink:c,title:d}=s,m=l?"h1":"h2";return(0,r.jsx)(m,{className:(0,a.A)(o.title,t),children:l?d:(0,r.jsx)(i.A,{to:c,children:d})})}var d=s(1312),m=s(5846),u=s(6266);const g={container:"container_iJTo"};function h(e){let{readingTime:t}=e;const s=function(){const{selectMessage:e}=(0,m.W)();return t=>{const s=Math.ceil(t);return e(s,(0,d.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:s}))}}();return(0,r.jsx)(r.Fragment,{children:s(t)})}function x(e){let{date:t,formattedDate:s}=e;return(0,r.jsx)("time",{dateTime:t,children:s})}function p(){return(0,r.jsx)(r.Fragment,{children:" \xb7 "})}function j(e){let{className:t}=e;const{metadata:s}=(0,n.e)(),{date:l,readingTime:i}=s,o=(0,u.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,r.jsxs)("div",{className:(0,a.A)(g.container,"margin-vert--md",t),children:[(0,r.jsx)(x,{date:l,formattedDate:(c=l,o.format(new Date(c)))}),void 0!==i&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(p,{}),(0,r.jsx)(h,{readingTime:i})]})]});var c}function b(e){return e.href?(0,r.jsx)(i.A,{...e}):(0,r.jsx)(r.Fragment,{children:e.children})}function f(e){let{author:t,className:s}=e;const{name:n,title:l,url:i,imageURL:o,email:c}=t,d=i||c&&`mailto:${c}`||void 0;return(0,r.jsxs)("div",{className:(0,a.A)("avatar margin-bottom--sm",s),children:[o&&(0,r.jsx)(b,{href:d,className:"avatar__photo-link",children:(0,r.jsx)("img",{className:"avatar__photo",src:o,alt:n})}),n&&(0,r.jsxs)("div",{className:"avatar__intro",children:[(0,r.jsx)("div",{className:"avatar__name",children:(0,r.jsx)(b,{href:d,children:(0,r.jsx)("span",{children:n})})}),l&&(0,r.jsx)("small",{className:"avatar__subtitle",children:l})]})]})}const A={authorCol:"authorCol_q4o9",imageOnlyAuthorRow:"imageOnlyAuthorRow_lXe7",imageOnlyAuthorCol:"imageOnlyAuthorCol_cxD5"};function v(e){let{className:t}=e;const{metadata:{authors:s},assets:l}=(0,n.e)();if(0===s.length)return null;const i=s.every((e=>{let{name:t}=e;return!t}));return(0,r.jsx)("div",{className:(0,a.A)("margin-top--md margin-bottom--sm",i?A.imageOnlyAuthorRow:"row",t),children:s.map(((e,t)=>(0,r.jsx)("div",{className:(0,a.A)(!i&&"col col--6",i?A.imageOnlyAuthorCol:A.authorCol),children:(0,r.jsx)(f,{author:{...e,imageURL:l.authorsImageUrls[t]??e.imageURL}})},t)))})}function N(){return(0,r.jsxs)("header",{children:[(0,r.jsx)(c,{}),(0,r.jsx)(j,{}),(0,r.jsx)(v,{})]})}var T=s(440),w=s(8509);function _(e){let{children:t,className:s}=e;const{isBlogPostPage:l}=(0,n.e)();return(0,r.jsx)("div",{id:l?T.blogPostContainerID:void 0,className:(0,a.A)("markdown",s),children:(0,r.jsx)(w.A,{children:t})})}var P=s(7559),k=s(4336),y=s(2053);function U(){return(0,r.jsx)("b",{children:(0,r.jsx)(d.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function C(e){const{blogPostTitle:t,...s}=e;return(0,r.jsx)(i.A,{"aria-label":(0,d.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...s,children:(0,r.jsx)(U,{})})}function R(){const{metadata:e,isBlogPostPage:t}=(0,n.e)(),{tags:s,title:l,editUrl:i,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:d}=e,m=!t&&o,u=s.length>0;if(!(u||m||i))return null;if(t){const e=!!(i||d||c);return(0,r.jsxs)("footer",{className:"docusaurus-mt-lg",children:[u&&(0,r.jsx)("div",{className:(0,a.A)("row","margin-top--sm",P.G.blog.blogFooterEditMetaRow),children:(0,r.jsx)("div",{className:"col",children:(0,r.jsx)(y.A,{tags:s})})}),e&&(0,r.jsx)(k.A,{className:(0,a.A)("margin-top--sm",P.G.blog.blogFooterEditMetaRow),editUrl:i,lastUpdatedAt:d,lastUpdatedBy:c})]})}return(0,r.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[u&&(0,r.jsx)("div",{className:(0,a.A)("col",{"col--9":m}),children:(0,r.jsx)(y.A,{tags:s})}),m&&(0,r.jsx)("div",{className:(0,a.A)("col text--right",{"col--3":u}),children:(0,r.jsx)(C,{blogPostTitle:l,to:e.permalink})})]})}var M=s(1046);const O="shareText_x93L",B="shareButton_AVfu",F=e=>{let{title:t,url:s}=e;return(0,r.jsxs)("div",{className:"social-share",children:[(0,r.jsx)("p",{className:O,children:"SHARE"}),(0,r.jsx)(M.wk,{url:s,className:B,children:(0,r.jsx)(M._z,{size:25,round:!0})}),(0,r.jsx)(M.r6,{url:s,title:t,className:B,children:(0,r.jsx)(M.uv,{size:25,round:!0})}),(0,r.jsx)(M._G,{url:s,title:t,className:B,children:(0,r.jsx)(M.G,{size:25,round:!0})}),(0,r.jsx)(M.Ot,{url:s,subject:t,body:`Check out this post: ${s}`,className:B,children:(0,r.jsx)(M.aZ,{size:25,round:!0})})]})};function L(e){let{children:t,className:s}=e;const i=function(){const{isBlogPostPage:e}=(0,n.e)();return e?void 0:"margin-bottom--xl"}(),{metadata:o}=(0,n.e)(),c=`${o.permalink}`;return(0,r.jsxs)(l,{className:(0,a.A)(i,s),children:[(0,r.jsx)(N,{}),(0,r.jsx)(_,{children:t}),(0,r.jsx)("div",{className:"blog-post-spacing"}),(0,r.jsx)("div",{className:"social-share-container",children:(0,r.jsx)(F,{title:o.title,url:c})}),(0,r.jsx)(R,{})]})}}}]);