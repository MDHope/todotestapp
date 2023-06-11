import {SegmentedButtons} from 'react-native-paper';
import {GetTasksParams} from '../../../domain/types';

interface FiltersProps {
  selectedField?: GetTasksParams['sort_field'];
  selectedSort?: GetTasksParams['sort_direction'];
  onFilterClick: (filter: GetTasksParams['sort_field']) => void;
}

export default function Filters({
  selectedSort,
  selectedField,
  onFilterClick,
}: FiltersProps) {
  const getIcon = (field: GetTasksParams['sort_field']) => {
    if (selectedField !== field) return;

    if (selectedSort === 'asc') {
      return 'arrow-up';
    }

    return 'arrow-down';
  };

  return (
    <SegmentedButtons
      value={selectedField || ''}
      onValueChange={value =>
        onFilterClick(value as GetTasksParams['sort_field'])
      }
      buttons={[
        {
          value: 'id',
          label: 'Id',
          icon: getIcon('id'),
        },
        {
          value: 'username',
          label: 'Пользователь',
          icon: getIcon('username'),
        },
        {
          value: 'email',
          label: 'Email',
          icon: getIcon('email'),
        },
        {
          value: 'status',
          label: 'Status',
          icon: getIcon('status'),
        },
      ]}
    />
  );
}
