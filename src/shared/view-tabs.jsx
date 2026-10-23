import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ActionTooltip from "./action-tooltip";
import { VIEWS } from "./const/view";

const ViewTabs = ({ view, setView, isLeadsEmpty, sx = {} }) => {
  const isCardsView = view === VIEWS.cards;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mx: "auto",
        width: {
          xs: "100%",
          sm: isCardsView ? "60%" : "100%",
        },
        ...sx,
      }}
    >
      {!isLeadsEmpty && (
        <ToggleButtonGroup
          exclusive
          value={view}
          onChange={(_, newValue) => {
            if (newValue !== null) {
              setView(newValue);
            }
          }}
          size="small"
          aria-label="Переключение отображения экспедиторов"
          sx={{
            alignSelf: {
              xs: "stretch",
              sm: "auto",
            },

            "& .MuiToggleButton-root": {
              px: 1.5,
              minWidth: 40,

              "&.Mui-selected": {
                color: "primary.main",
                backgroundColor: "action.selected",
              },
            },
          }}
        >
          <ActionTooltip title="Показать таблицей">
            <ToggleButton value={VIEWS.table} aria-label="Показать таблицей">
              <ViewListRoundedIcon fontSize="small" />
            </ToggleButton>
          </ActionTooltip>

          <ToggleButton value={VIEWS.cards} aria-label="Показать карточками">
            <GridViewRoundedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </Box>
  );
};

export default ViewTabs;
