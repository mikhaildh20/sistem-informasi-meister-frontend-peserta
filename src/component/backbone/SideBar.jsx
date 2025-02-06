import Menu from "./Menu";

export default function SideBar({
  listMenu,
  isShow,
  handleShowMenu,
  displayName,
  roleName,
}) {
  return (
    <div
      className={
        "border-end position-fixed h-100 overflow-y-auto z-3 bg-white" +
        (isShow ? " w-100" : " sidebarMenu pt-1")
      }
    >
      <Menu
        listMenu={listMenu}
        isShow={isShow}
        handleShowMenu={handleShowMenu}
        displayName={displayName}
        roleName={roleName}
      />
    </div>
  );
}
