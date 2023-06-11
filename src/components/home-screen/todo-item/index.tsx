import {Button, Card, Text} from 'react-native-paper';
import {Task} from '../../../domain/types';
import {STATUS_LABELS} from '../../../domain/constants';

interface TodoItemProps {
  item: Task;
  isEditable: boolean;
  onEditClick: () => void;
}

export default function TodoItem({
  item,
  isEditable,
  onEditClick,
}: TodoItemProps) {
  return (
    <Card>
      <Card.Content style={{marginBottom: 8}}>
        <Text>{item.text}</Text>
        <Text style={{marginTop: 6}}>{`Статус: ${
          STATUS_LABELS[item.status]
        }`}</Text>
        <Text>{`От: ${item.username} (email: ${item.email})`}</Text>
      </Card.Content>
      {isEditable ? (
        <Card.Actions>
          <Button onPress={onEditClick}>Редактировать</Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
}
