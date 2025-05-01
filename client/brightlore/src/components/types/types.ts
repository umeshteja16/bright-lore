export interface SearchbarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

export interface SearchChangeEvent
  extends React.ChangeEvent<HTMLInputElement> {}

export interface PaperProps {
  title: string;
  image: string;
  type: string;
}
