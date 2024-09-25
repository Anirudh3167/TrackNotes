<h1 align="center"> Problems Encountered with Solutions </h1>

## The ( ...) Problem
Error Sample : <br />
``` 
<span>User Authentication (OAuth, Email Verification, Dedicated pages,...)</span> 
``` 
<br />
Error: <br />
``` 
    Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities 
```
<br />
Solution : <br />
```
<span>{`User Authentication (OAuth, Email Verification, Dedicated pages,...)`}</span>
``` 
<br />

<br />

## The Next UI Problem
Error Sample : <br />
At `providers.tsx` ,  <br />
``` 
    import {NextUIProvider} from "@nextui-org/react" 
``` 
<br />
Error : <br />
``` 
Type error: Cannot find module '@/components/primitives' or its corresponding type declarations.
> 1 | import { title } from "@/components/primitives";
    |                       ^
  2 |
  3 | export default function AboutPage() {
  4 |   return (
Error: Command "npm run build" exited with 1 
``` 
<br />
Solution : <br />
``` 
import {NextUIProvider} from "@nextui-org/system" 
``` 
<br />
Additional Info : <br />
``` 
This occurs only at the production time 
``` 
<br />

<br />

## The Next UI problem 2
Error Sample : <br />
```
Using "nextui init -t app" inside already existing Next App
```
<br />
Error : <br />
```
Type error: Cannot find module '@/components/primitives' or its corresponding type declarations.
> 1 | import { title } from "@/components/primitives";
    |                       ^
  2 |
  3 | export default function AboutPage() {
  4 |   return (
Error: Command "npm run build" exited with 1 
```
<br />
Solution : <br />
```
For existing project there is no need for this,
You can do `npm i @nextui-org/react`

Then just go with the rest of the process
```
<br />
Additional Info : <br />
```
This can be corrected by deleting the `next-app-folder`
if any such exists
```
<br />

<br />

## The Client and Server problem
background :
```
Used a server function (getServerSession) and a cline functio (customFetch) on same utils.ts

The result is server overriding and some errors.

Corrected by seperating the server requested components and client requested components
```
```

## Decision Update
Updating New Notes url from `\editor` to `\editor\new`

## The Editor Buttons Problem
The editor is having cursor position autoset to the end.

Corrected by using the setTimeout after `textarea.focus()`
This is because `setMarkdown()` is re rendering due to which the component gets built again