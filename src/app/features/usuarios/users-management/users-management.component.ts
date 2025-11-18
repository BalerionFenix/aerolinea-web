import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {Usuario} from '../../../core/models/Usuarios/usuario.model';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users-management',
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent {

  users: Usuario[] = [];
  cargando = false;
  selectedUsers: number[] = [];
  searchTerm: string = '';
  filteredUsers: Usuario[] = [];
  showFilterDropdown = false;
  filterRolAdmin = false;
  filterRolUsuario = false;
  filterActivo = false;
  filterInactivo = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.cargando = true;

    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...this.users];
        this.updatePagination();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.cargando = false;
        alert('No se pudieron cargar los usuarios. Intenta nuevamente.');
        this.router.navigate(['/dashboard']); // vuelve a dashboard al aceptar
      }
    });
  }

  toggleSelection(id: number) {
    this.selectedUsers.includes(id)
      ? this.selectedUsers = this.selectedUsers.filter(x => x !== id)
      : this.selectedUsers.push(id);
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  editUser(id: number) {
    console.log('Editar', id);
    this.router.navigate(['/dashboard/usuarios/editar/', id]).then(success => {
      if (success) {
        console.log('Navegación completada');
      } else {
        console.error('Error al navegar');
      }
    });
  }


  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.nombre.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.rol?.nombre.toLowerCase().includes(term));

      // Aplica filtros avanzados
      let rolOk = true;
      if (this.filterRolAdmin || this.filterRolUsuario) {
        rolOk = (this.filterRolAdmin && user.rol?.nombre === 'Administrador') ||
          (this.filterRolUsuario && user.rol?.nombre === 'Usuario');
      }

      let estadoOk = true;
      if (this.filterActivo || this.filterInactivo) {
        estadoOk = (this.filterActivo && user.activo) ||
          (this.filterInactivo && !user.activo);
      }

      return matchesSearch && rolOk && estadoOk;
    });

    this.currentPage = 1;
    this.updatePagination();
  }


  clearFilter(): void {
    // Limpiar término de búsqueda
    this.searchTerm = '';

    // Limpiar filtros avanzados
    this.filterRolAdmin = false;
    this.filterRolUsuario = false;
    this.filterActivo = false;
    this.filterInactivo = false;

    // Restaurar todos los usuarios
    this.filteredUsers = [...this.users];

    // Resetear paginación
    this.currentPage = 1;
    this.updatePagination();
  }


  toggleFilterDropdown() {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  applyAdvancedFilter() {
    this.filteredUsers = this.users.filter(user => {
      const rolOk = (this.filterRolAdmin && user.rol?.nombre === 'Administrador') ||
        (this.filterRolUsuario && user.rol?.nombre === 'Usuario') ||
        (!this.filterRolAdmin && !this.filterRolUsuario);

      const estadoOk = (this.filterActivo && user.activo) ||
        (this.filterInactivo && !user.activo) ||
        (!this.filterActivo && !this.filterInactivo);

      return rolOk && estadoOk;
    });

    this.showFilterDropdown = false;
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedUsers(): Usuario[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsers.slice(start, end);
  }

  deleteUser(id: number) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.usuario_id !== id);
        this.applyFilter();
      },
      error: (err) => console.error('Error al eliminar usuario:', err)
    });
  }




  protected readonly Math = Math;
}
