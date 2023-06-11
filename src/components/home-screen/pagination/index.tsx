import {Button, IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface PaginationProps {
  totalItems: number;
  activePage: number;
  onPageClick: (page: number) => void;
}

const ITEMS_PER_PAGE = 3;
const PAGES = 3;

export default function Pagination({
  totalItems,
  activePage,
  onPageClick,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const getActivePages = () => {
    const start =
      activePage % PAGES === 0
        ? activePage - PAGES
        : activePage - (activePage % PAGES);
    const result = [];

    const maxPages = totalPages < PAGES ? totalPages : PAGES;

    for (let i = 1; i <= maxPages; i++) {
      result.push(start + i);
    }

    return result;
  };

  const onPrevClick = () => {
    if (activePage <= 1) return;

    onPageClick(activePage - 1);
  };
  const onNextClick = () => {
    if (activePage >= totalPages) return;

    onPageClick(activePage + 1);
  };

  return (
    <View style={styles.container}>
      <IconButton
        disabled={activePage <= 1}
        icon="arrow-left-thin"
        mode="outlined"
        onPress={onPrevClick}
      />
      {getActivePages().map(page => (
        <Button
          key={page}
          mode={activePage === page ? 'contained' : 'outlined'}
          onPress={() => onPageClick(page)}
          style={{flex: 1}}
          disabled={page > totalPages}>
          {page}
        </Button>
      ))}
      <IconButton
        disabled={activePage >= totalPages}
        icon="arrow-right-thin"
        mode="outlined"
        onPress={onNextClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
});
