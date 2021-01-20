declare interface IMainWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'MainWebPartStrings' {
  const strings: IMainWebPartStrings;
  export = strings;
}
