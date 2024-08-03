# Current Assumptions
- Authentication will be done based on Username and Password only
- Notes Id will be stored at localstorage
- Anyone can access the notes (as authentication is not implemented)
- At /notes datetime alone is creating confusion. Instead, You can try saving the first 50 characters too
- Markdown links are still not tested.

# Level 0 (Build a basic utility I.e. only focus on Notes)
- A Basic Authentication based on (Username (Unique), Password) + JWT authentication
- Notes with preview option and markdown support
- Cloud storage (by file System based working)

# Don't forget
- To define the `getUser` and `createUser`
- Use skeletons for loading screen

- Better to store the fetched data somewhere like context API to avoid these GET things for checking
- Error Cases are not handled
- Signup can further be organized by creating an Object type of the input fields
like,
```
{
    label : "Username",
    type : "text",
    ref : usernameRef
}
```
 - UI components are still not organized (specially the NavbarUI)