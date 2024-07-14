import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const AboutMeList = [
  {
    title: 'Passionate Explorer',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        I love learning new things and experimenting in my small home lab setup. My motto? "Break and fix!"
        It is all about hands-on explodation and embracing every opportunity to grow.
      </>
    ),
  },
  {
    title: 'Community Contributor',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        I enjoy creating material and contributing to the developer community through open source
        projects, blog posts, and mentorship.
      </>
    ),
  },
  {
    title: 'Sports Driven',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      You will often find me enjoying nature or on the field, playing team sports.
      Recently, I have joined a local women’s rugby team, where I am embracing the creativity of the sport itself.
      </>
    ),
  },
];

function AboutMe({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
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
