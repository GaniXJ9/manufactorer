import { useTranslation } from "react-i18next";
import { useEffect, useState, useSyncExternalStore } from "react";
import NotificationsBlock from "./notifications/notifications-block";
import { LanguageSwitcher } from "./language-switcher";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  getProfile,
  getProfileSnapshot,
  subscribeProfile,
} from "../../shared/api/profile";
import { logout } from "../../shared/api/auth";
import logo from "../../../assets/logo.png";

const HEADER_HEIGHT = 64;

const menuItems = [
  {
    label: "nav.home",
    to: "/",
    icon: <HomeOutlinedIcon fontSize="small" />,
    tooltip_text: "nav.homePage",
  },
  {
    label: "nav.leads",
    to: "/leads",
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    tooltip_text: "",
  },
  {
    label: "nav.partnersMenu",
    to: "/distributors",
    icon: <GroupsOutlinedIcon fontSize="small" />,
    tooltip_text: "",
  },
];

function MenuLinkItem({ to, label, icon, tooltip_text, closeSideMenu }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ListItemButton
      selected={
        pathname === to || (to !== "/" && pathname.startsWith(`${to}/`))
      }
      title={tooltip_text ? t(tooltip_text) : undefined}
      onClick={() => {
        navigate(to);
        closeSideMenu();
      }}
      sx={{
        borderRadius: 2,
        py: 1.25,
        mb: 0.5,
      }}
    >
      <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={t(label)} />
    </ListItemButton>
  );
}

export function Header() {
  const { t } = useTranslation();
  const profile = useSyncExternalStore(subscribeProfile, getProfileSnapshot);

  useEffect(() => {
    const controller = new AbortController();
    getProfile(controller.signal).catch(() => {
      // Keep the email and initial fallback if the profile is unavailable.
    });
    return () => controller.abort();
  }, []);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [email, setEmail] = useState(() => window.APP_DATA?.user_email || "");

  useEffect(() => {
    if (email) return;

    // APP_DATA can be injected by the host page after React mounts.
    const timer = window.setInterval(() => {
      const nextEmail = window.APP_DATA?.user_email;
      if (!nextEmail) return;

      setEmail(nextEmail);
      window.clearInterval(timer);
    }, 100);

    return () => window.clearInterval(timer);
  }, [email]);

  const navigate = useNavigate();

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const userEmail = profile?.email || email || t("auth.user");

  const logoSrc = window.APP_DATA?.logo_url || logo;

  const toggleBurgerMenu = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  const closeSideMenu = () => {
    setIsBurgerOpen(false);
  };

  const handleOpenProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleCloseProfileMenu();
    navigate(path);
  };

  const handleOpenLogoutModal = () => {
    handleCloseProfileMenu();
    setLogoutError("");
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    if (isLogoutLoading) return;
    setLogoutError("");
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = async () => {
    if (isLogoutLoading) return;

    setIsLogoutLoading(true);
    setLogoutError("");

    try {
      await logout();
      window.location.replace("/login");
    } catch (error) {
      setLogoutError(
        error.message || "errors.logout",
      );
      setIsLogoutLoading(false);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-around",
        px: { xs: 1, sm: 3 },
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 3,
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <IconButton
          title={isBurgerOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-label={isBurgerOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          onClick={toggleBurgerMenu}
          sx={{
            transition: "0.2s",
            transform: isBurgerOpen ? "rotate(90deg)" : "rotate(0deg)",
            display: { xs: "block", sm: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component="img"
          src={logoSrc}
          alt="360 Logistics"
          sx={{
            height: { xs: 28, sm: 32 },
            width: "auto",
            maxWidth: { xs: 130, sm: 170 },
            "@media (max-width: 359px)": { maxWidth: 90 },
            objectFit: "contain",
            display: "block",
            flexShrink: 0,
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: 0,
          flexShrink: 1,
          ml: "auto",
        }}
      >
        <LanguageSwitcher />
        <NotificationsBlock />

        <Button
          variant="outlined"
          onClick={handleOpenProfileMenu}
          title={userEmail}
          aria-label={t("auth.userProfile", { value: userEmail })}
          sx={{
            minWidth: 0,
            maxWidth: { xs: 140, sm: 220, md: 280 },
            px: { xs: 0.75, sm: 1.25 },
            textTransform: "none",
            overflow: "hidden",
            flexShrink: 1,
            gap: 0.75,
            "@media (max-width: 449px)": {
              width: 36,
              height: 36,
              minWidth: 36,
              maxWidth: 36,
              px: 0,
              border: "none",
              borderRadius: "50%",
            },
          }}
        >
          <Avatar
            src={profile?.avatar || undefined}
            alt={t("profile.photo")}
            sx={{
              width: { xs: 24, sm: 28 },
              height: { xs: 24, sm: 28 },
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            {userEmail.charAt(0).toUpperCase()}
          </Avatar>

          <Typography
            component="span"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: 12, sm: 14 },
              lineHeight: 1.4,
              "@media (max-width: 449px)": {
                display: "none",
              },
            }}
          >
            {userEmail}
          </Typography>
        </Button>
      </Box>

      <Box
        sx={{
          p: 1,
          borderTop: "1px solid",
          borderRight: "1px solid",
          borderColor: "divider",
          position: "fixed",
          top: HEADER_HEIGHT,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s",
          overflow: "hidden",
          left: 0,
          width: {
            xs: isBurgerOpen ? "100%" : 0,
            sm: "20vw",
          },
          minWidth: {
            sm: 220,
          },
          backgroundColor: "background.default",
          // zIndex: 1099,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "flex-end",
            mb: 1,
          }}
        >
          <IconButton
            title={t("nav.closeMenu")}
            onClick={toggleBurgerMenu}
            aria-label={t("nav.closeMenu")}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <MenuLinkItem
              key={item.to}
              {...item}
              closeSideMenu={closeSideMenu}
            />
          ))}
        </List>
      </Box>

      <Menu
        anchorEl={profileAnchorEl}
        open={isProfileMenuOpen}
        onClose={handleCloseProfileMenu}
      >
        <MenuItem onClick={() => handleNavigate("/profile")}>{t("nav.profile")}</MenuItem>

        <MenuItem disabled>
          {t("nav.settings")}
        </MenuItem>

        <MenuItem onClick={handleOpenLogoutModal}>{t("auth.logout")}</MenuItem>
      </Menu>

      <Dialog open={isLogoutModalOpen} onClose={handleCloseLogoutModal}>
        <DialogTitle>{t("auth.logoutTitle")}</DialogTitle>

        <DialogContent>
          <DialogContentText>{t("auth.confirmLogout")}</DialogContentText>
          {logoutError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {t(logoutError)}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseLogoutModal} disabled={isLogoutLoading}>
            {t("common.cancel")}
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmLogout}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? t("auth.loggingOut") : t("auth.logoutAction")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
