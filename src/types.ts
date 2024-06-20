//Quote Tool's input and output data
export interface QuoteData {
  text: string;
  caption: string;
  alignment: "center" | "left";
}

//Quote Tool's initial configuration
export interface QuoteConfig {
  quotePlaceholder?: string;
  captionPlaceholder?: string;
  defaultAlignment?: "center" | "left";
}

//Tunes Menu configuration
export interface TunesMenuConfig {
  icon: string;
  label: string;
  isActive: boolean;
  closeOnActivate: boolean;
  onActivate: () => void;
}
