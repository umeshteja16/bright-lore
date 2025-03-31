export interface SearchbarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}

export interface SearchChangeEvent
  extends React.ChangeEvent<HTMLInputElement> {}

export interface PaperProps {
  title: string;
  image: string;
  year: number;
}
