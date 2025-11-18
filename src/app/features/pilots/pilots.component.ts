import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-pilots',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.css'
})
export class PilotsComponent {

  pilots = [
    { name: 'John Doe', id: 'PILOT-001', base: 'JFK', hours: 620, active: true, photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc-iAkybAkFOGbHkUZmLDUwJZqyqFKcShmkgLJz15KZKsMK3e0DmBQ6IxAGL4te-9RkW61B4fyaSpRluylYJAsNpZAuzKCMVQHh6LJfovV2vk9sl2ZTv0Wmq6TazIy-RtOfzHFaYNuLsJDN0NIPxFl_ycLv-dEdfdgpGd7w78rPhKea-2b66OEjiN9LCYnAwOHvalNYOOGhJ9jYTckuDI204J8Ga_RqJ-vcP0eZ6JrigX0QpVSChPgUbeGMiUVixf2y_jBoq7sM0dw' },
    { name: 'Jane Smith', id: 'PILOT-002', base: 'LAX', hours: 450, active: true, photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGbqcIBRz2gdpgdeUy7yflWwrubr6MHhlMnnc0LvASgr3NaF_F32jbkQ3pejPgRNwK4WM2gl36dzVZkbi2tN6ZbmpVrE15wVsqSvPxEDMBnk6oXkx6PF5OEhi90EXxSkRshEP443hRHMRggY11rgMnufT_Gr00DyvOkyltbS5DPDesdwDPsakrc_vXEj2QZ3n3KWttVg4bOiqN3OnukSpEwaJkx22_eVkvyzGY9E9zZDzZyVf6VoQMvszFTSloDYM0xhUW54vK6G4Q' },
    { name: 'Mike Johnson', id: 'PILOT-003', base: 'ORD', hours: 710, active: false, photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjVH6JpDmOXy4uPxBUuJBR-Ahj_FQEAE999B-c1jpKVK2aKBYu96lWTd3b8ZvJOjNcNNV2dmu-1q1NTOjLbhlHy2WVjKB2PxR6UczhSYpHFsP7EYanzX85H8z38WhQrv0alPcgHFQgxW73QbJBtntrDk5w5his5eVE3XjyUp-6dYETW4JItFqf0Ckx3X_LZwG4D5HoFXXu9U5gsk4p8D7WWKj6vCwoF7yqBInu_Gh5brj7E8kHQv29-iUGJrhhHp68a' },
    { name: 'Emily Davis', id: 'PILOT-004', base: 'JFK', hours: 530, active: true, photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZQ9bgY2o6uRghCMuMbrUfsjCnxV7OpDymu0gJ8hkgRe0syFBgvh2Bq3qIegZAKfrl4h7sQkt3KhDxk5fwvCjsj17j4oEo6H8evl6rJzWQHpzC-h_2G8oIjB5_yX0NlF5uG2YcFslxAEdp6m6fh2JeF2Y3X3UPML3mzQqM5pnf4FdbEJlnJtS1UlH5rEoH2cb_hh5x7n8GvT_Rl3TQ0Q4riV_qXWv4sMbxSPLwD' },
  ];


}
