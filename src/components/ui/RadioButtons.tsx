import {Controller, ControllerProps, FieldValues} from 'react-hook-form';
import {RadioButton} from 'react-native-paper';

interface RadioButtonsProps<T extends FieldValues>
  extends Omit<ControllerProps<T>, 'render'> {
  items: Array<{label: string; value: string}>;
}

export default function RadioButtons<T extends FieldValues>({
  items,
  ...rest
}: RadioButtonsProps<T>) {
  return (
    <Controller
      {...rest}
      render={({field}) => (
        <RadioButton.Group
          onValueChange={value => field.onChange(+value)}
          value={field.value.toString()}>
          {items.map(item => (
            <RadioButton.Item
              key={item.value}
              value={item.value}
              label={item.label}
            />
          ))}
        </RadioButton.Group>
      )}
    />
  );
}
