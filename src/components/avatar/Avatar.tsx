const Avatar = () => {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: "var(--color-avatar-bg)" }}
      >
        👤 {/* 기본 아이콘 (추후 이미지 적용 가능) */}
      </div>
    );
  };
  
  export default Avatar;
  