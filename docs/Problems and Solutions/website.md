<h1 align="center"> Problems Encountered with Solutions </h1>

## The ( ...) Problem
Error Sample : <br />
```<span>User Authentication (OAuth, Email Verification, Dedicated pages,...)</span>``` <br />
Error: <br />
``` Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities ```
Solution : <br />
```<span>{`User Authentication (OAuth, Email Verification, Dedicated pages,...)`}</span>``` <br />

<br />

## The Next UI Problem
Error Sample : <br />
At `providers.tsx` ,  <br />
``` import {NextUIProvider} from "@nextui-org/react" ``` <br />
Error : <br />
``` 
Type error: Cannot find module '@/components/primitives' or its corresponding type declarations.
> 1 | import { title } from "@/components/primitives";
    |                       ^
  2 |
  3 | export default function AboutPage() {
  4 |   return (
Error: Command "npm run build" exited with 1 
``` <br />
Solution : <br />
``` import {NextUIProvider} from "@nextui-org/system" ``` <br />
Additional Info : <br />
``` This occurs only at the production time ``` <br />
<br />