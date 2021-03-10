import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function SearchHistory({ searchHistory, setSearchHistory }) {
  return (
    <div className="search_history_container">
      <Grid container alignItems="center">
        <Grid item xs={8}>
          <h3>Search history</h3>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="secondary"
            style={{ float: 'right' }}
            onClick={() => setSearchHistory([])}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
      <List className="history_list">
        {searchHistory.map((el, indx) => (
          <ListItem button key={indx}>
            <ListItemText
              primary={`${el.viewport[0]}, ${el.viewport[1]} - ${el.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchHistory;
