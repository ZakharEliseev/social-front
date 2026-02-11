import React from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { GetUsersResponseList } from '../../models/constants';
import { User } from '../User';

interface Props {
    foundUsers: GetUsersResponseList;
}
export const UsersList = ({foundUsers} : Props) => {
    const parentRef = React.useRef(null);
    const rowVirtualizer = useVirtualizer({
        count: foundUsers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 120,
        gap: 10,
    });

    return (
        <div
            ref={parentRef}
            style={{
                height: `65vh`,
                overflow: 'auto',
                marginTop: '20px',
            }}>
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}>
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const user = foundUsers?.[virtualRow.index];
                  if (!user) return;
                  return (
                      <div
                          key={virtualRow.key}
                          style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                          }}>
                          <User user={user} />
                      </div>
                  );
                })}
            </div>
        </div>
    );
};
