export interface LocalNotesType {
    noteId: string;
    access: string;
    content: string; // Just get the first 25 characters
    lastUpdated: string;
    createdAt: string;
    author: string;
  }

export interface EditorMenuActions {
  "Actions" : {name:string, action: () => void}[],
  "Access" : {name:string, action: (access?:string) => void}[],
  "Delete" : {name:string, action: () => void}[],
}