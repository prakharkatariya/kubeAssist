import { useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from '@/types/nav';

interface Props {
  item: NavItem;
  index: number;
  open: boolean;
}

function SideMenuItem({ item, index, open }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSelected = pathname.includes(item.url);

  return (
    <div
      key={index}
      style={
        {
          position: 'relative',
          marginTop: '4px',
          '&::before': isSelected
            ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '10%',
                height: '80%',
                width: '4px',
                marginLeft: '4px',
                backgroundColor: 'primary.main',
                borderRadius: '0 4px 4px 0',
              }
            : {},
        } as any
      }
    >
      <button
        style={
          {
            minHeight: 48,
            backgroundColor: isSelected ? `blue` : 'transparent',
            '&:hover': {
              backgroundColor: isSelected ? `light blue` : 'rgba(0, 0, 0, 0.04)',
            },
          } as any
        }
        onClick={() => {
          navigate(item.url);
        }}
      >
        <span
          style={{
            opacity: open ? 1 : 0,
            color: isSelected ? '#fff' : '#f0f0f0',
          }}
        >
          {item.title}
        </span>
      </button>
    </div>
  );
}

export default SideMenuItem;
