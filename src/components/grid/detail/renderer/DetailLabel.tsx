// components/grid/detail/renderer/DetailLabel.tsx
interface Props {
    label?: string;
  }
  
  export const DetailLabel: React.FC<Props> = ({ label }) => {
    if (!label) return null;
    return <h2 className="text-center mb-3">{label}</h2>;
  };
  