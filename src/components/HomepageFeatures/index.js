import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const AboutMeList = [
  {
    title: '🚀 Passionate Explorer',
    description: (
      <>
        I love learning new things and experimenting in my small home lab setup. My motto? "Break and fix!"
        It is all about hands-on explodation and embracing every opportunity to grow.
      </>
    ),
  },
  {
    title: '🤝 Community Contributor',
    description: (
      <>
        I enjoy creating material and contributing to the developer community through open source
        projects, blog posts, and mentorship.
      </>
    ),
  },
  {
    title: '💻 Expertise',
    description: (
      <>
      My expertise lay around GitOps and DevOps practises.
      I create content about Cilium, Rancher, RKE2 deployments, Openshift deployments in on-prem and cloud environments.
      </>
    ),
  },
  {
    title: '🏉 Sports Enthusiast',
    description: (
      <>
      You will often find me enjoying nature or on the field, playing team sports.
      Recently, I have joined a local women’s rugby team, where I am embracing the creativity of the sport itself.
      </>
    ),
    center: true,
  },
];

function AboutMe({ Svg, title, description, center }) {
  return (
    <div className={clsx('col', center && 'col--4 offset--center')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {AboutMeList.map((props, idx) => (
            <AboutMe key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
