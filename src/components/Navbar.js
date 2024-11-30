import { useSelector, useDispatch } from "react-redux";
import { IconBrightnessUp, IconMoonFilled } from "@tabler/icons-react";
import { themeToggled } from "../store/commonSlice";

function Navbar() {
  const theme = useSelector((state) => state.common.theme);
  const dispatch = useDispatch();

  const handleThemeBtnClick = () => {
    dispatch(themeToggled(theme == "light" ? "dark" : "light"));
  };

  return (
    <nav className="fixed h-[40px] flex justify-between items-center text-sm text-black dark:text-white px-5 py-3 top-0 left-0 right-0 shadow-md border-b border-gray-200 dark:border-slate-700">
      <h6>SIGIQ | WHITEBOARD</h6>

      <>
        <div className="flex justify-between ">
          <button
            onClick={handleThemeBtnClick}
            className=" rounded-md p-2 duration-300 hover:bg-[#000] hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {theme == "light" ? (
              <IconBrightnessUp size={16} />
            ) : (
              <IconMoonFilled size={16} />
            )}
          </button>
        </div>
      </>
    </nav>
  );
}

export default Navbar;
