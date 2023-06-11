import {Controller, ControllerProps, FieldValues} from 'react-hook-form';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
} from 'react-native-paper';
import {View} from 'react-native';

interface TextInputProps<T extends FieldValues>
  extends Omit<ControllerProps<T>, 'render'>,
    Omit<PaperTextInputProps, 'defaultValue'> {}

export default function TextInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...rest
}: TextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field, fieldState}) => (
        <View>
          <PaperTextInput
            {...rest}
            onChangeText={field.onChange}
            value={field.value}
            error={!!fieldState.error}
          />
          <HelperText type="error" visible={!!fieldState.error}>
            {fieldState.error?.message}
          </HelperText>
        </View>
      )}
    />
  );
}
