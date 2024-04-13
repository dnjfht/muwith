'use client';

import React from 'react';

interface FlexWrapProps {
  player: YT.Player | null;
  children: React.ReactNode;
}

export default function FlexWContentrap({ player, children }: FlexWrapProps) {
  const childrenWithProps = React.Children.map(children, (child) => {
    // 타입 검사를 통해 React 요소인지 확인.
    if (React.isValidElement(child)) {
      // @ts-expect-error Force inject player prop
      return React.cloneElement(child, { player });
    }
    return child;
  });

  return <div className="w-full flex">{childrenWithProps}</div>;
}
