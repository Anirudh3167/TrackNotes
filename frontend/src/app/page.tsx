import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <h1> College Works </h1>
      <ul style={{listStyle:'inside'}}>
        <li>Clilege mail Id</li>
        <li>10:00AM Internship Fair</li>
        <li>UHV printout</li>
        <li>UHV project</li>
        <li>Web tech + Java assignment</li>
        <li>Java Printout</li>
        <li>Java Internal Viva</li>
        <li>HS-352 (Credit basis, Effect on CGPA)</li>
        <li>AI teacher + file + internal</li>
        <li>Web Tech File + Stats File</li>
      </ul>
    </div>
  );
}
